from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Count, Sum
from base.models import Game, Order, OrderItem
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User  # Import User if needed
from django.contrib.auth.decorators import login_required  # Import for login_required
from rest_framework import status
from django.db.models import Count, Sum, F

# The endpoint to fetch all games (products)
@api_view(['GET'])
def getGames(request):
    games = Game.objects.all()  # Fetch all games from the database
    games_data = [
        {
            "id": game._id,  # Use _id as the primary key here
            "name": game.name,
            "price": str(game.price),  # Convert Decimal to string for easy display
            "category": game.category,
            "image_url": game.image_url,  # Include image URL if needed
        }
        for game in games
    ]
    return Response(games_data)

# The endpoint to fetch a single game based on its _id
@api_view(['GET'])
def getGame(request, pk):
    try:
        game = Game.objects.get(_id=pk)  # Query using _id instead of pk
        game_data = {
            "id": game._id,  # Use _id for the response
            "name": game.name,
            "price": str(game.price),
            "category": game.category,
            "description": game.description,
            "image_url": game.image_url,  # Include image URL if needed
        }
        return Response(game_data)
    except Game.DoesNotExist:
        return Response({"error": "Game not found"}, status=404)

# Dashboard Stats endpoint
@api_view(['GET'])
def getDashboardStats(request):
    # Get the total number of users
    total_users = User.objects.count()
    
    # Get the total number of games/products
    total_products = Game.objects.count()

    # Get the total quantity of items ordered (sum of all order items)
    total_orders = OrderItem.objects.aggregate(total_items=Sum('quantity'))['total_items'] or 0

    # Get the total revenue from all orders
    total_revenue = Order.objects.aggregate(total_revenue=Sum('total_price'))['total_revenue'] or 0
    
    # Return the data as a response
    return Response({
        'total_users': total_users,
        'total_products': total_products,
        'total_orders': total_orders,  # This now reflects the total quantity of items ordered
        'total_revenue': total_revenue,
    })


@api_view(['GET'])
def getOrderDetails(request):
    # Fetch all orders with their items (optimized with prefetch_related)
    orders = Order.objects.all().prefetch_related('orderitem_set')

    order_details = []
    for order in orders:
        items = order.orderitem_set.all()
        for item in items:
            order_details.append({
                'order_id': order.id,
                'user': order.user.username if order.user else 'Anonymous',  # Handle case where user might be None
                'product': item.game.name,  # Game/product name
                'quantity': item.quantity,  # Quantity ordered
                'money_spent': item.total_price,  # Money spent on this order item
                'users_bought': item.game.orderitem_set.count(),  # Number of users who bought this product
            })
    
    return Response(order_details)


def is_superuser(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_superuser': request.user.is_superuser})
    else:
        return JsonResponse({'is_superuser': False})  # Return false if not authenticated


@api_view(['POST'])
def createOrder(request):
    data = request.data  # Expecting data to be sent in the request body

    # Create a new order
    order = Order.objects.create(
        user=None,  # Set user to None for unauthenticated orders
        total_price=data['total_price']  # Assuming total_price is sent in the request
    )

    # Create order items
    for item in data['order_items']:  # Assuming order_items is a list of items
        game_id = item['id']  # Use 'id' instead of 'game_id'
        quantity = item['quantity']

        try:
            game = Game.objects.get(_id=game_id)  # Get the game by ID
            OrderItem.objects.create(
                order=order,
                game=game,
                quantity=quantity
            )
        except Game.DoesNotExist:
            return Response({'error': f'Game with ID {game_id} does not exist.'}, status=400)

    return Response({'message': 'Order created successfully', 'order_id': order.id}, status=201)

@api_view(['GET'])
def get_users(request):
    if request.method == 'GET':
        users = User.objects.all()  # Get all users
        user_data = []
        for user in users:
            user_data.append({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_superuser': user.is_superuser,
            })
        return Response(user_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_game_details(request):
    # Fetch all games and annotate with the required details
    games = Game.objects.annotate(
        total_sold=Sum('orderitem__quantity'),  # Sum the quantity of each order item for the game
        total_sales_amount=Sum(F('orderitem__quantity') * F('price'))  # Calculate total sales amount
    ).values('_id', 'name', 'total_sold', 'total_sales_amount')  # Use _id instead of id

    return Response(games)
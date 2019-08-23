from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include
from tickets.models import Ticket, Category
import django_js_reverse.views
from rest_framework import routers
from ticketmanagement.views import UserViewSet, TicketViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register(r'api/users', UserViewSet)

router.register(r'api/tickets', TicketViewSet)

router.register(r'api/category', CategoryViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),
    path(r'api/', include('rest_framework.urls', namespace='rest_framework')),
    path(r'', TemplateView.as_view(template_name='exampleapp/itworks.html'), name='home'),
    path(r'', include(router.urls))
]

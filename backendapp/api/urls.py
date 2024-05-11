from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreateView.as_view(), name="note-list"),
    path('notes/delete/<int:pk>', views.DeleteListView.as_view(), name="delete-list"),
] 
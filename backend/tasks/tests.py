from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Task


class TaskAPITests(APITestCase):

    def test_create_task(self):
        data = {
            "title": "Learn Django Testing",
            "priority": "high",
            "due_date": "2026-09-15",
            "status": "pending",
        }

        response = self.client.post(
            reverse("task-list-create"),
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertEqual(
            Task.objects.count(),
            1,
        )

    def test_get_tasks(self):
        Task.objects.create(
            title="Test Task",
            priority="medium",
            status="pending",
        )

        response = self.client.get(
            reverse("task-list-create")
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            len(response.data),
            1,
        )

    def test_update_task(self):
        task = Task.objects.create(
            title="Old Title",
            priority="low",
            status="pending",
        )

        response = self.client.patch(
            reverse(
                "task-detail",
                kwargs={"pk": task.id},
            ),
            {
                "status": "completed",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        task.refresh_from_db()

        self.assertEqual(
            task.status,
            "completed",
        )

    def test_delete_task(self):
        task = Task.objects.create(
            title="Delete Me",
            priority="low",
            status="pending",
        )

        response = self.client.delete(
            reverse(
                "task-detail",
                kwargs={"pk": task.id},
            )
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertEqual(
            Task.objects.count(),
            0,
        )

    def test_empty_title_is_rejected(self):
        response = self.client.post(
            reverse("task-list-create"),
            {
                "title": "   ",
                "priority": "medium",
                "status": "pending",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )
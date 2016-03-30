from __future__ import unicode_literals
from django.db import models
from datetime import datetime
import time


class Subscriber(models.Model):
    email = models.CharField(max_length=300)
    date_subscribed = models.CharField(default=0, max_length=300)

    def calc_date_subscribed(self):
        subscribed = time.strftime("%d/%m/%Y")
        return subscribed

    def __str__(self):
        return self.email


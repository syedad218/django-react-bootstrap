# Generated by Django 2.2.4 on 2019-08-24 19:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0004_auto_20190824_1950'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='ticket',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='tickets.Ticket'),
        ),
    ]
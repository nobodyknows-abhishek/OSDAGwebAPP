from django.db import models

class Beam(models.Model):
    name = models.CharField(max_length=100)
    length = models.FloatField(default=100)
    width = models.FloatField(default=100)
    height = models.FloatField(default=100)  
    def __str__(self):
        return self.name

class Column(models.Model):
    name = models.CharField(max_length=255)  
    height = models.FloatField()  
    width = models.FloatField() 
    base_plate_thickness = models.FloatField()
    flange_thickness = models.FloatField()
    web_thickness = models.FloatField()

    def __str__(self):
        return self.name

class Load(models.Model):
    beam = models.ForeignKey(Beam, on_delete=models.CASCADE)
    column = models.ForeignKey(Column, on_delete=models.CASCADE)
    plate_thickness = models.FloatField()
    bolt_diameter = models.FloatField()
    bolt_grade = models.CharField(max_length=50,default="A325")
    def __str__(self):
        return f"{self.beam.name} to {self.column.name}"

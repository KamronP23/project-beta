# CarCar

Team:

* Kamron Poosti - Sales
* Todd Compton - Services

## Design

CarCar is a web appllication designed to track a auto dealership by tracking inventory of vehicles, sales, and services. Each application is split into its own microservice, utilizing RESTful API's to provide each o ther with information. The project utilizes docker.

### CarCar Features:
* Create Auto Manufacturers & List Manufacturers
* Create Vehicle Models & List Models
* Create Vehicles & List Vehicles
* Create Salespersons
* Create Potential Customers
* Create a Sale & list all Sales
* A list of Salespersons sale record
* Create Technicians
* Create, List, Delete and complete Service Appointments
* Service Appointment List page with VIP feature for vehicles in the dealerships inventory
* Search for service history by VIN

### Context Map:
![Alt text](README_image/image.png)

## Installation
1. Fork Repository from https://gitlab.com/ToddCompton/project-beta
2. Clone to your local machine with
```
git clone <insert HTTPS>
```
3. Input following commands into terminal:
```
 docker volume create beta-data
 docker-compose build
 docker-compose up
```
4. Access site via http://localhost:3000

## How to Use:
### to create a vehicle:
A manufacturer is required to create a model and a model is required to create an automobile.
1. Begin by creating a manufacturer from the inventory dropdown
2. Create a model from the inventory dropdown
3. Create automobile from the inventory dropdown

### To sell vehicles:
A customer, salesperson and a vehicle are required to create a sale.
1. Begin by creating a customer from the sales dropdown
2. Create a salesperson from the sales dropdown
3. sell a vehicle from the sales drop down
4. get a list of all vehicles sold from the Sales dropdown
5. get salesperson recrods from the sales dropdown.

### To schedule a service
1. Begin by creating a technician from the Service - Add a Technician dropdown.
2. Create a service appointment from the Service - Add a Service Appointment dropdown.
3. To cancel or complete an active service appointment, select Service - Show a List of Appointments - Cancel / Complete
4. To see a list of all active and past service appointments for a specific VIN, selecte Service - Show Service Appointments by VIN and enter VIN in the prompt



## Inventory insomnia URL, Port, JSON requirements
### Manufacturer:
* Create/POST Manufacturer - http://localhost:8100/api/manufacturers/
* JSON:
```
{
  "name": "Toyota"
}
```
* List/GET Manufacturers - http://localhost:8100/api/manufacturers/

### Models:
* Create/POST Model - 	http://localhost:8100/api/models/
* JSON:
```
{
  "name": "DB11",
  "picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfgbiKa5Ym9edZv5vAVZqEUWn5knEy9qqdA&usqp=CAU",
  "manufacturer_id": "5"
}
```
* List/GET Models - http://localhost:8100/api/models/

### Automobiles
* Create/POST Automobile - http://localhost:8100/api/automobiles/
* JSON:
```
{
  "color": "Red",
  "year": 2023,
  "vin": "204",
  "model_id": 4
}
```
* List/GET Automobiles - http://localhost:8100/api/automobiles/

## Sales microservice
### Models for the Sales microservice:
* AutomobileVO
* Salesperson
* PotentialCustomer
* Sales

the sales model uses the AutmobileVO, Salesperson and PotentialCustomer models as foreign keys.

### integration with inventory microservice:
The Sales microservice will poll data from the automobiles inventory to an AutomobileVO model (value object). The AutomobileVO model has an added sold BoolianField that is set the False. When a vehicle is sold in the Sales form, the sold value will change to True. It will then be used to filter out sold cars from the saleform VIN dropdown. The Salesperson record and list of all Sales page will update when a car is sold to provide that data.

## Sales insomnia URL, Port, JSON requirements
### Salesperson:
* Create/POST Salesperson - http://localhost:8090/api/salespersons/
* JSON:
```
{
  "name": "Kamron",
  "employee_number": "12345"
}
```
* List/GET Salesperson - http://localhost:8090/api/salespersons/

### Customer
* Create/POST Customer - http://localhost:8090/api/customer/
* JSON:
```
	{
			"name": "Some Name",
			"street": "Street address",
			"city": "A city",
			"zip_code": "Zip Code",
			"state": "State",
			"phone": "5551551555"
	}
```
### Sale
* Create/POST Sale - http://localhost:8090/api/sales/
* JSON:
```
{
  "sale_price": "18000",
  "automobile": "/api/automobiles/233CC5DB11/", 
	"customer": "A Name",
	"salesperson": "A Name"
}
```
* List/GET Sales - http://localhost:8090/api/sales/

### Polling for Sales

* List/GET Automobile Value Objects - http://localhost:8090/api/automobileVOs/

## Service microservice

### Models for the Service microservice:
* AutosVO
* Technician
* Service

The Service model uses the Technician model as a foreign key.

### integration with inventory microservice:
The Service microservice uses poller.py to poll data from Inventory regarding automobile VINs to an AutosVO model (value object). The AutosVO model has an added VIP BooleanField which defaults to True for vehicles scheduling service appointments from inventory. When a service appointment is created, the view api_list_services checks whether the VIN came from inventory and appropriately sets the VIP status. The Service model contains a completed BooleanField used to filter completed service from the list of active service appointments.

## Service Appointment http RESTful APIs - insomnia URL, Port, JSON requirements
### Technician:
* Create/POST Technician - http://localhost:8080/api/technicians/
* JSON:
```
{
  "technician_name": "Post Malone",
  "employee_number": "12"
}
```
* List/GET Technicians - http://localhost:8080/api/technicians/

### Service Appointments
* Create/POST Service Appointment - http://localhost:8080/api/services/
* JSON:
```
	{
        "customer_name": "Vin Diesel",
        "date_time": "2026-02-14T12:12",
        "reason": "More torque",
        "completed": false,
        "technician": "Gear Head",
        "vin": "999",
        "vip": false	
	}
```
* List/Get Service Appointments - http://localhost:8080/api/services/

### Polling for Service Appointments

* List/GET Automobile Value Objects - http://localhost:8080/api/autosVOs/

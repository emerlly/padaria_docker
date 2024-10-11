Sistema de mensageria de padaria com docker 

//criar Docker na raiz (PADARIA_DOCKER) rodar 
$ docker-compose up --build

----- para criar itens no banco
metodo post localhost:3000/orders
    {
        "description": "Pão de forma",
        "date": "2024-10-07",
        "status": "processando",
        "address": "Rua Exemplo, 123"
    }

----- buscar itens no banco
metodo get localhost:3000/orders

------ buscar iten por id
metodo get localhost:3000/orders/:id

##############################
        sellService
buscar itens por id no orderService(pedido)

metodo post localhost:3001/sales/:id


Sistema de mensageria de padaria com docker 

##################################################
# //criar Docker, na raiz (PADARIA_DOCKER) rodar #
# $ docker-compose up --build                    #
##################################################

-> para criar itens no banco
    metodo post localhost:3000/orders
    
        {
            "clienteId": 1,  
            "status": "pendente", 
            "valorTotal": 150.00,  
            "items": [  
                {
                "produtoId": 101,  
                "quantidade": 2,  
                "precoUnitario": 25.00  
                },
                {
                "produtoId": 102,
                "quantidade": 1,
                "precoUnitario": 100.00
                }
            ]
        }


-> buscar itens no banco
    metodo get localhost:3000/orders

-> buscar iten por id
    metodo get localhost:3000/orders/:id

#################################
#        sellService            #
#################################

-> buscar itens por id no orderService(pedido)
    metodo post localhost:3001/sales/:id


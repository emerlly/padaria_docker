Sistema de mensageria de padaria com docker 

##################################################
# //criar Docker, na raiz (PADARIA_DOCKER) rodar #
# $ docker-compose up --build                    #
# após gerar docker, rodar                       #
# $ docker-compose up                            #
##################################################

#################################################
             ORDERSERVICE(pedido)
#################################################

-> para criar itens no banco
    metodo post 
        -> localhost:3000/orders
    
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
    metodo get 
        -> localhost:3000/orders

-> buscar iten por id
    metodo get 
        -> localhost:3000/orders/:id

#############################################
#           sellService(vendas)             #
#############################################

-> buscar itens por id no orderService(pedido)
    metodo post 
        ->  localhost:3001/sales/:id

(Rota que busca os pedidos gerados pelo OrderService)

####################################
#             RPC                  #
####################################

ClientServices
-> Cadastrar Cliente no banco de dados
    metodo grpc /cadastrarCliente
        -> localhost:50051/
            {
                "nome": "Nome",
                "email": "Mail",
                "endereco": "address", 
                "telefone" : "fone"
            }

-> Consultar Cliente no bando 
    metodo grpc /listarCliente
        -> localhost:50051/
            {
                "id": 1
            }

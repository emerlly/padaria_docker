# Sistema de Mensageria de Padaria com Docker
    Este projeto implementa um sistema de mensageria para uma padaria utilizando microserviços e Docker. 
    O sistema está estruturado para lidar com pedidos, vendas e cadastro de clientes.

# 🚀 Iniciando o Sistema
Pré-requisitos
     Docker e Docker Compose instalados em sua máquina.

Passo a passo para subir o ambiente
 Navegue até o diretório raiz do projeto (PADARIA_DOCKER).
 
     Construa as imagens Docker e inicie os containers:
     $ docker-compose up --build
     Após a criação das imagens, inicie novamente os serviços:
     $ docker-compose up

📦 Microserviços
O sistema é composto por três microserviços principais:

    1. OrderService (Pedidos)
    2. SellService (Vendas)
    3. ClientService (Clientes)

# OrderService (Pedidos)
O OrderService é responsável por gerenciar os pedidos da padaria.

Endpoints Disponíveis

     Criar um novo pedido

        -> Método: POST
        -> URL: http://localhost:3000/orders
            -> Exemplo de Payload:
            
            json
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
    -> Buscar todos os pedidos
        -> Método: GET
        -> URL: http://localhost:3000/orders
    
    -> Buscar pedido por ID
        -> Método: GET
        -> URL: http://localhost:3000/orders/:id

# SellService (Vendas)
O SellService é responsável por consultar informações de vendas e interagir com os pedidos.

Endpoints Disponíveis

    -> Buscar pedido por ID (integrado ao OrderService)
        -> Método: POST
        -> URL: http://localhost:3001/sales/:id
        -> Descrição: Consulta os pedidos gerados pelo OrderService.

# ClientService (Clientes)
O ClientService utiliza comunicação RPC (Remote Procedure Call) para gerenciar informações de clientes.

Métodos Disponíveis

    -> Cadastrar Cliente
        -> Método: gRPC
        -> URL: localhost:50051/
        -> Exemplo de Payload:
        
        json
            {
                "nome": "Nome",
                "email": "email@exemplo.com",
                "endereco": "Rua Exemplo, 123", 
                "telefone": "99999-9999"
            }

    -> Consultar Cliente por ID

        -> Método: gRPC
        -> URL: localhost:50051/
        -> Exemplo de Payload:
        
        json
            {
                "id": 1
            }


# 📚 Tecnologias Utilizadas
    -> Docker e Docker Compose para containerização
    -> Node.js com Express para os microserviços HTTP
    -> gRPC para comunicação entre serviços de cliente
    -> MySQL para gerenciamento de dados

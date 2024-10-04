
# Desafio Técnico IA Avatar

Este projeto é uma aplicação de chat que permite ao usuário interagir com uma IA (OpenAI ou DialogFlow) e visualizar um avatar 3D personalizado integrado ao **Ready Player Me**.

## Índice

- [Desafio Técnico IA Avatar](#desafio-técnico-ia-avatar)
  - [Índice](#índice)
  - [Requisitos](#requisitos)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
    - [Configuração da OpenAI](#configuração-da-openai)
    - [Configuração do DialogFlow](#configuração-do-dialogflow)
  - [Rodando o Projeto](#rodando-o-projeto)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Funcionalidades](#funcionalidades)
    - [Chat com IA](#chat-com-ia)
    - [Avatar Personalizado](#avatar-personalizado)
    - [Feedback Visual](#feedback-visual)
  - [Considerações Finais](#considerações-finais)
    - [Dificuldades Enfrentadas](#dificuldades-enfrentadas)
    - [Melhorias Futuras](#melhorias-futuras)
    - [Licença](#licença)

## Requisitos

Antes de rodar o projeto, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) como gerenciador de pacotes
- Credenciais de API da [OpenAI](https://beta.openai.com/signup/)
- Credenciais de API do [DialogFlow](https://cloud.google.com/dialogflow)
- Uma conta no [Ready Player Me](https://readyplayer.me/) para personalizar o avatar

## Instalação

Siga os passos abaixo para instalar e configurar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/usuario/desafio-tecnico-ia-avatar.git
   cd desafio-tecnico-ia-avatar
   ```

2. **Instale as dependências do projeto:**

   Se estiver usando `npm`:

   ```bash
   npm install
   ```

   Se estiver usando `yarn`:

   ```bash
   yarn install
   ```

## Configuração

Antes de rodar o projeto, você precisará configurar as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
# Chave de API da OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# ID do Projeto no DialogFlow (Google Cloud)
GOOGLE_PROJECT_ID=your-dialogflow-project-id

# Porta em que o servidor será executado
PORT=5000
```

### Configuração da OpenAI

Para obter sua chave da OpenAI, siga os passos abaixo:

1. Crie uma conta em [OpenAI](https://beta.openai.com/signup/).
2. Gere uma chave de API em [API Keys](https://beta.openai.com/account/api-keys).
3. Adicione a chave no arquivo `.env`.

### Configuração do DialogFlow

1. Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/).
2. Ative a **DialogFlow API**.
3. Gere e baixe as credenciais JSON e adicione a chave no arquivo `.env` como `GOOGLE_PROJECT_ID`.
4. Instale e configure o [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) se necessário.

## Rodando o Projeto

Depois de configurar as variáveis de ambiente e instalar as dependências, siga os passos abaixo para rodar o projeto localmente.

1. **Inicie o servidor:**

   Execute o comando abaixo para iniciar o servidor backend:

   ```bash
   npm run dev
   ```

   Isso iniciará o servidor Express na porta definida no `.env` (por padrão, `5000`).

2. **Acesse o projeto:**

   Abra o navegador e acesse `http://localhost:5000` para visualizar o frontend da aplicação.

## Estrutura do Projeto

Aqui está a estrutura básica do projeto:

```
desafio-tecnico-ia-avatar
├── backend
│   ├── controllers
│   │   └── iaController.js        # Controlador que gerencia a comunicação com a IA
│   ├── routes
│   │   └── chat.js                # Rotas relacionadas ao chat
│   └── main.js                    # Arquivo principal do servidor Express
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Avatar.js          # Componente responsável por renderizar o avatar
│   │   │   └── Chat.js            # Componente responsável pela lógica do chat
│   │   └── services
│   │       └── ApiService.js      # Serviço que comunica o frontend com o backend
│   └── public
│       └── index.html             # Arquivo HTML principal do frontend
├── .env                           # Arquivo de variáveis de ambiente (não deve ser commitado)
├── package.json                   # Arquivo de dependências e scripts
├── webpack.config.js              # Configurações do Webpack
└── README.md                      # Documentação do projeto
```

## Funcionalidades

### Chat com IA
- O usuário pode interagir com uma IA utilizando a OpenAI (GPT-3.5).
- Caso a cota da OpenAI seja excedida, o sistema automaticamente utiliza o DialogFlow como fallback.

### Avatar Personalizado
- O avatar do usuário é renderizado via **Ready Player Me** e pode ser integrado à interface.
- O avatar é responsivo e adaptável a diferentes tamanhos de tela.

### Feedback Visual
- Durante a interação com a IA, o usuário recebe feedbacks visuais de carregamento.
- Mensagens de erro são exibidas caso algo dê errado na comunicação com a IA.

## Considerações Finais

Este projeto foi desenvolvido como parte de um desafio técnico. Ele demonstra uma integração entre o backend em Node.js, o frontend em React, e APIs de IA (OpenAI e DialogFlow) juntamente com um avatar 3D personalizado do Ready Player Me.

### Dificuldades Enfrentadas
Durante o desenvolvimento da parte do frontend, encontrei algumas dificuldades, pois não estava tão acostumado com React. No entanto, gostei do desafio e aprendi muito com ele.

### Melhorias Futuras
- Implementar animações no avatar em resposta às interações do chat.
- Adicionar suporte a múltiplos modelos de IA e permitir a troca dinâmica entre eles.

Se você encontrar qualquer problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

### Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

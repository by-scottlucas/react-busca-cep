# React Busca CEP

O **React Busca CEP** é uma aplicação que permite a busca de informações detalhadas de endereços a partir de um CEP (Código de Endereçamento Postal). Além disso, a aplicação exibe um mapa interativo da região correspondente, facilitando a visualização e localização do endereço pesquisado.

## Funcionalidades

- **Busca de CEP**: Permite ao usuário inserir um CEP e obter informações completas como logradouro, bairro, cidade e estado.
- **Exibição de Mapa**: Um mapa interativo é gerado centralizando a região do endereço pesquisado. Se o usuário informar o número do endereço, a localização exata é destacada.
- **Exibição de Toast**: Em caso de erro, um toast é exibido com uma mensagem de alerta para o usuário.
- **Loading Spinner**: Exibe um indicador visual enquanto a busca está em andamento.

## Estrutura do Projeto

- **`public/`**: Arquivos públicos estáticos, como `index.html` e ícones.
- **`src/components/`**: Componentes React reutilizáveis, como o mapa interativo, toast e barra de busca.
- **`src/hooks/`**: Hooks customizados, como `useLocationByCep`, que centralizam lógica de busca e estado.
- **`src/services/`**: Serviços de API responsáveis por buscar informações do CEP e coordenadas de endereço.
- **`src/utils/`**: Funções utilitárias, como formatação de CEP.
- **`src/App.js`**: Componente principal que organiza a lógica da aplicação, interação do usuário e renderização dos componentes.

## Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/by-scottlucas/react-busca-cep.git
```

2. Navegue até o diretório do projeto:

```bash
cd react-busca-cep
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra a aplicação no navegador em `http://localhost:5173` e insira um CEP para começar a buscar informações de endereço e visualizar o mapa.

## Tecnologias Utilizadas

- **HTML**: Estruturação do conteúdo da página.
- **CSS / Tailwind CSS**: Estilização e layout responsivo usando utilitários do Tailwind.
- **JavaScript**: Lógica da aplicação.
- **React**: Construção da interface de usuário interativa.
- **Lucide Icons**: Biblioteca de ícones para botões e elementos visuais.

## **Licença**

Este projeto está licenciado sob a [Licença MIT](./LICENCE).

## **Autor**

Este projeto foi desenvolvido por **Lucas Santos Silva**, Desenvolvedor Full Stack, graduado pela **Escola Técnica do Estado de São Paulo (ETEC)** nos cursos de **Informática (Suporte)** e **Informática para Internet**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bylucasss/)

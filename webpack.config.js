const path = require('path');

module.exports = {
  entry: './frontend/src/index.js',  // Ponto de entrada do frontend
  output: {
    filename: 'bundle.js',  // Nome do arquivo de saída
    path: path.resolve(__dirname, 'frontend/public'),  // Diretório de saída
    publicPath: '/',  // Define o caminho base para todos os recursos
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Transpila arquivos JavaScript
        exclude: /node_modules/,  // Exclui a pasta node_modules
        use: {
          loader: 'babel-loader',  // Utiliza Babel para transpilar ES6+ para ES5
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  // Presets para JavaScript moderno e React
          },
        },
      },
      {
        test: /\.css$/,  // Regras para carregar arquivos CSS
        use: ['style-loader', 'css-loader'],  // Carrega CSS dentro dos componentes
      },
      {
        test: /\.(png|jpe?g|gif|svg|glb)$/i,  // Regras para carregar arquivos de imagem e modelos 3D
        use: [
          {
            loader: 'file-loader',  // Utiliza file-loader para importar arquivos como URLs
            options: {
              name: '[name].[hash].[ext]',  // Gera nomes de arquivos com hash para evitar cache
              outputPath: 'assets',  // Define o diretório de saída dos arquivos
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Extensões que serão resolvidas automaticamente
  },
  devServer: {
    static: path.resolve(__dirname, 'frontend/public'),  // Diretório para arquivos estáticos
    historyApiFallback: true,  // Habilita fallback para o SPA (Single Page Application)
    compress: true,  // Habilita compressão dos arquivos servidos
    port: 3000,  // Porta onde o servidor de desenvolvimento irá rodar
  },
  mode: 'development',  // Define o modo de desenvolvimento
};

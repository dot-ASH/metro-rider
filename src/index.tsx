import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { AppRouter } from './router';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<AuthProvider>
		<React.StrictMode>
			<AppRouter />
		</React.StrictMode>
		</AuthProvider>
	</ChakraProvider>,
	document.getElementById('root')
);

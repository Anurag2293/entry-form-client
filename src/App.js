import './App.css';
import Home from './components/Home';

import EntryState from './context/entries/EntryState';
function App() {
	return (
		<>
			<EntryState>
				<Home/>
			</EntryState>
		</>
	);
}

export default App;

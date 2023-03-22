import './App.css';
import Home from './components/Home';
import Alerts from './components/Alerts';

import EntryState from './context/entries/EntryState';
import AlertState from './context/alerts/AlertState';

function App() {
	return (
		<>
			<EntryState>
				<AlertState>
					<Alerts />
					<Home />
				</AlertState>
			</EntryState>
		</>
	);
}

export default App;

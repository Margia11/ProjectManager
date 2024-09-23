import React from "react";
import { default as Navbar } from "./store/components/Navbar";
import { default as Footer } from "./store/components/Footer";
import { Provider } from "react-redux";
import {store} from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./store/screen/HomeScreen";
import ProjectsScreen from "./store/screen/ProjectsScreen";
import CategoryScreen from "./store/screen/CategoryScreen";


function App() {
	return (
	<div className="App">
		<Provider store={store}>
			<Router>
				<Navbar />
					<Routes>
						<Route path="/" element={<HomeScreen/>} />
						<Route path="/projects" element={<ProjectsScreen/>} />
						<Route path="/category" element={<CategoryScreen/>} />
					</Routes>
					<Footer/>
			</Router>
		</Provider>
	</div>
	);
  }

export default App;

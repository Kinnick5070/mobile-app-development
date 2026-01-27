
// Step 1 - add useContext and createContext to the imports:
const {useState, useEffect, useContext, createContext} = React


// Step 2 - create a context for the theme (light/dark)
const ThemeContext = createContext('light');

// define the 'root' component
function RootComponent(){

	// Step 3 - create a state variable to hold the current theme
	const [theme, setTheme] = useState("light");

	// Step 7 - use useEffect to run side effects when the theme changes
	useEffect(() => {
	
		console.log("ThemeContext value changed:", theme);
		
		if (theme === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}

	}, [theme]);

		
	// Step 4 - provide the theme context to child components
	return (
		<ThemeContext.Provider value={{theme, setTheme}}>
			<div>
				<h1>Some App</h1>
				<ComponentA />
				<ComponentB />
			</div>
		</ThemeContext.Provider>
	);

}



function ComponentA(){
	
	// Step 5 - consume the theme context (and display it in the UI below)
	const {theme} = useContext(ThemeContext);

	return (
		<div>
			<h2>Component A</h2>
			<p>Current theme: {theme}</p>
		</div>
	);

}

function ComponentB(){
	
	// Step 6 - consume the theme context (and display allow it to be changed below)
	const {theme, setTheme} = useContext(ThemeContext);

	return (
		<div>
			<h2>Component B</h2>
			<input type="radio" name="theme" value="light" checked={theme==="light"} onChange={(e)=>setTheme(e.target.value)} /> Light
			<input type="radio" name="theme" value="dark" checked={theme==="dark"} onChange={(e)=>setTheme(e.target.value)} /> Dark
		</div>
	);

}


// this code creates a React application and attaches it to the elemenet with the id of app.
const app = ReactDOM.createRoot(document.querySelector("#app"))

// display/render the root component 
// - this will invoke your RootComponent() function, which returns JSX
// - (the param that you pass into app.render() is JSX)
app.render(<RootComponent />);




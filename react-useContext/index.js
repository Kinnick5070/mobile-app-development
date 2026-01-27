
// BEFORE STARTING, REVIEW THE CODE IN THIS FILE
// Step 1 - add useContext and createContext to the imports:
// Step 2 - create a context for the theme (light/dark)
// Step 3 - create a state variable to hold the current theme
// Step 4 - provide the theme context to child components
// Step 5 - consume the theme context in ComponentA (and display it in the UI)
// Run the app and note that ComponentA shows the current theme
// Step 6 - consume the theme context in ComponentB (and display allow it to be changed)
// Run the app and verify that changing the theme in ComponentB updates it ComponentA
// Step 7 - use useEffect to apply the theme to the document body (a side effect)


// Step 1
const {useState, useEffect} = React

// Step 2



function RootComponent(){

	// Step 3


	// The last step will go here (step 7)

		
  // Step 4
	return (
			<div>
				<h1>Some App</h1>
				<ComponentA />
				<ComponentB />
			</div>
	);

}



function ComponentA(){
	
  // Step 5 - consume the theme context (and display it in the UI below)


	return (
		<div>
			<h2>Component A</h2>
			<p>Current theme: "put theme here"</p>
		</div>
	);

}

function ComponentB(){
	
	// Step 6 - consume the theme context (and display allow it to be changed below)

	return (
		<div>
			<h2>Component B</h2>
			<input type="radio" name="theme" value="light" /> Light
			<input type="radio" name="theme" value="dark" /> Dark
		</div>
	);

}


// this code creates a React application and attaches it to the elemenet with the id of app.
const app = ReactDOM.createRoot(document.querySelector("#app"))
app.render(<RootComponent />);




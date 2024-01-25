// Importing the React library, which is required for building React components.
import React from 'react';

// Importing the 'Arena' component from the specified file path.
import Arena from '../ui/chessboard/Arena';

// Defining the 'App' functional component.
const App = () => {
	// Returning JSX (JavaScript XML) to define the structure of the component.
	return (
		// Using a <div> element with CSS classes to center the content both horizontally and vertically.
		<div className="flex justify-center items-center">
			{/* Rendering the 'Arena' component within the parent <div>. */}
			<Arena />
		</div>
	);
};

// Exporting the 'App' component as the default export of this module.
export default App;

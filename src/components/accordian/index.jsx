import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordion() {
	// State to track selected item for single selection
	const [selected, setSelected] = useState(null);

	// State to enable or disable multi-selection
	const [enableMultiSelection, setEnableMultiSelection] = useState(false);

	// State to track selected items for multi-selection
	const [multiple, setMultiple] = useState([]);

	// Handle single selection: toggle the selected item
	function handleSingleSelection(getCurrentId) {
		setSelected(getCurrentId === selected ? null : getCurrentId);
	}

	// Handle multi-selection: add or remove item from the selected list
	function handleMultiSelection(getCurrentId) {
		let cpyMultiple = [...multiple];
		const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

		if (findIndexOfCurrentId === -1) {
			cpyMultiple.push(getCurrentId);
		} else {
			cpyMultiple.splice(findIndexOfCurrentId, 1);
		}

		setMultiple(cpyMultiple);
	}

	return (
		<div className="acc-wrapper">
			{/* Button to toggle multi-selection mode */}
			<button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
				Enable Multi Selection
			</button>

			<div className="accordion">
				{data && data.length > 0 ? (
					data.map((dataItem) => (
						<div className="item" key={dataItem.id}>
							{/* Clickable title to toggle accordion content */}
							<div
								onClick={
									enableMultiSelection
										? () => handleMultiSelection(dataItem.id)
										: () => handleSingleSelection(dataItem.id)
								}
								className="title"
							>
								<h3>{dataItem.question}</h3>
								<span>+</span>
							</div>

							{/* Conditional rendering of the content based on selection mode */}
							{enableMultiSelection
								? multiple.indexOf(dataItem.id) !== -1 && (
										<div className="acc-content">{dataItem.answer}</div>
								  )
								: selected === dataItem.id && (
										<div className="acc-content">{dataItem.answer}</div>
								  )}
						</div>
					))
				) : (
					<div>No data found!</div>
				)}
			</div>
		</div>
	);
}

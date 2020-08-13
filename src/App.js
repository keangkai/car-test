import React, { useState, useEffect } from "react"

import { Container, Row, Card, CardDeck } from "react-bootstrap"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	useEffect(() => {
		axios({
			url: "https://api.jsonbin.io/b/5f33f98ddddf413f95c2b306",
			headers: {
				"secret-key":
					"$2b$10$0ve8/zpqfEF0X1kZ0TdfW.ehq645eiEhc.OykoUZABVEdE8D3bpr2",
				Accept: "*/*",
			},
			method: "get",
		}).then(
			(result) => {
				setIsLoaded(true)
				const filter_car = result.data.filter((car) => {
					return car.year >= 2000 && car.year <= 2007
				})
				filter_car.sort((a, b) => (a.year > b.year ? 1 : -1))
				setItems(filter_car)
			},
			(error) => {
				setIsLoaded(true)
				setError(error)
			}
		)
	}, [])

	if (error) {
		return <div>Error: {error.message}</div>
	} else if (!isLoaded) {
		return <div>Loading...</div>
	} else {
		return (
			<>
				<Container>
					<Row>
						{items.map((data) => (
							<div className="col-3 mb-3">
								<CardDeck>
									<Card>
										<Card.Body>
											<Card.Title>
												{data && data.brand} {data && data.model}
											</Card.Title>
											<Card.Text>
												<p>{data.year}</p>
												<p style={{ color: `${data.color}` }}>{data.color}</p>
												<div className="brand">{data.brand} Image</div>
												<p className="text-right mb-0 mt-4">
													Owner: {data.owner}
												</p>
											</Card.Text>
										</Card.Body>
									</Card>
								</CardDeck>
							</div>
						))}
					</Row>
				</Container>
			</>
		)
	}
}

export default App

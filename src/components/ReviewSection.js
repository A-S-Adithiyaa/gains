import React, { useState, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const ReviewSection = ({ cards }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardContainerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    const cardContainer = cardContainerRef.current;
    const cardWidth = cardContainer.offsetWidth / 3; // Assuming 3 cards are visible at a time
    const maxScroll = cardContainer.scrollWidth - cardContainer.clientWidth;
    const newPosition = scrollPosition + scrollOffset;

    // Calculate the maximum scroll position that doesn't exceed the bounds
    const newScrollPosition = Math.max(0, Math.min(maxScroll, newPosition));

    // If the new scroll position is within bounds, update the scroll position and scroll
    if (newScrollPosition !== scrollPosition) {
      cardContainer.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(newScrollPosition);
    }
  };

  return (
    <div>
      <div className="navigation-buttons">
        <span className="arrow-buttons" onClick={() => handleScroll(-200)}>
          <FaArrowCircleLeft />
        </span>
        <span className="arrow-buttons" onClick={() => handleScroll(200)}>
          <FaArrowCircleRight />
        </span>
      </div>
      <div
        className="card-container"
        id="card-container"
        ref={cardContainerRef}
        style={{ overflowX: "hidden", display: "flex" }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="card-wrapper"
            // style={{ flex: "0 0 33.33%", textAlign: "center" }}
          >
            <Card
              style={{
                width: "calc(100% - 20px)",
                margin: "10px",
                height: "100%",
                border: "3px solid var(--orange-shade)",
                borderRadius: "30px",
              }}
            >
              <Card.Img
                variant="top"
                src="images/scattered-forcefields.svg"
                style={{ padding: "10px" }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: 900, fontSize: "30px" }}>
                  {card.title}
                </Card.Title>
                <Card.Text>
                  <div>
                    <p>{card.profession}</p>
                  </div>
                  <div>{card.content}</div>
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;

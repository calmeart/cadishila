import React from "react";

import measurement from "../images/measurements.jpeg"

function About() {

  return (
    <div id="about" className="container">
      <section id="shilaburda">
        <h5 className="mb-3">ShilaBurda</h5>
        <p>ShilaBurda is founded as a homemade clothes and accessories store targeting domestic companions. Shila is the name of our Maltese Terrier daughter who joined our family approximately a year ago. Since then, I have been making clothes for her in my sewing machine. Many products that you see in this store are clothes that our Shila would like to wear. After a while, with the support of my family and friends, I decided to open this store that displays everything that I made for both myself and Shila.</p>
        <p>ShilaBurda products section has two different sections for humans and pets. You can navigate through them through the buttons below the store name.</p>
      </section>

      <section id="howdowework">
        <h5 className="mb-3">How Do We Work?</h5>
        <p>ShilaBurda is currently working on an order basis system. While for humans sizes are more flexible, pets can have many different characteristic proportions. In each product, there is a standard size and a custom setting that allows you to submit your required needs for your desired product. If you would like to know how to measure the size of your pet, please continue reading our Size & Measurements guide.</p>
        <p>After you made an order with a valid communication method, our store will get in contact with you to confirm the details of your order in terms of product, duration, delivery, and payment. </p>
      </section>

      <section id="material">
        <h5 className="mb-3">Materials</h5>
        <p>All the materials we use are machine washable and selected for their durability in case your pet tries to arrange them with their teeth. </p>
      </section>

      <section id="measurements">
        <h5 className="mb-3">Size & Measurements</h5>
        <p>Choosing the proper size is important for the comfort of your companion and you when you put it on them. That's why we provided you with a diagram that shows how to select the perfect fit for your pet.</p>
        <div className="row">
          <div className="col-sm-auto">
            <img className="me-5" src={measurement} alt="measurement diagram for dogs" width="300px" height="194px"></img>
          </div>
          <div className="col">
            <p>The three most important measurements are neck, chest, and length. </p>
            <ul>
              <li>For the neck girth, take a tape measure and measure the circumference of the neck around the base. Make sure that it is not too tight, and make sure it is still big enough to pass through their head. </li>
              <li>For the chest, measure the circumference around the widest portion of their body, and consider a little space where your pet can bend their front feet through the sleeves. </li>
              <li>Length is the distance between the base of the neck and the beginning of the tail. Usually, our products have a shorter front and longer back length, so our clothes wouldn't cause any discomfort to hind legs.</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  )
};

export default About;

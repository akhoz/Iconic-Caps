import React, { useState } from 'react';

function Faq() {
  const questionsAnswers = [
    { question: "What payment methods does your company accept and are there any specific requirements for each?", answer:  "At our company we strive to offer multiple payment options to make it easier for our customers to carry out transactions comfortably and securely. We accept credit cards from major issuers, PayPal for those who prefer fast and secure online payments, and direct bank transfers. For bank transfers, please make sure to include your order reference number to speed up the process of confirming your payment." },
    { question: "What is the estimated delivery or execution time of the service once the order is placed?", answer: "We understand the importance of prompt delivery of our services. Typically, delivery time is 2 to 3 business days after order confirmation. This period allows us to ensure that everything is processed properly and that the service meets our quality standards before reaching you."},
    { question: "Could you please detail the guarantees or return policies your company offers?", answer:  "We are committed to the quality of our services and products. Therefore, we offer a one-year warranty to cover any manufacturing defects. In addition, we understand that changes may arise or the product may not meet your expectations, so We provide a 30-day return policy. During this period, you can return the product in its original condition for a full refund or exchange."},
    { question: "Are there any special benefits or discounts for frequent customers at your company?", answer: "We greatly value our customer loyalty and, as a thank you, we offer a 10% discount on all orders for our repeat customers. This benefit is automatically activated in your account after your fifth purchase and is applicable to all future transactions " },
    { question: "How can I leave a review or feedback about your service after my experience?", answer: "We love hearing from our customers and their experiences with our services. You can leave your comments, reviews or any feedback through our website, specifically in the 'Contact Us' section. There you will find a simple form that you can fill out. Your Feedback is vital to us as it helps us improve and continue to offer exceptional service."}
  ];

  const [openIndexes, setOpenIndexes] = useState(Array(questionsAnswers.length).fill(false));

  const toggleIndex = index => {
    const newOpenIndexes = [...openIndexes];
    newOpenIndexes[index] = !newOpenIndexes[index];
    setOpenIndexes(newOpenIndexes);
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl font-bold mb-5 text-center" >Frequently Asked Questions</h2>
      {questionsAnswers.map((item, index) => (
        <div key={index} className="mb-2">
          <button
            className="py-2 px-4 w-full text-left flex justify-between items-center text-white bg-gray-700 hover:bg-gray-500 font-semibold rounded-lg"
            onClick={() => toggleIndex(index)}
          >
            <span>{item.question}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor"/>
              <rect x="4" y="5" width="16" height="2" rx="1" fill="currentColor"/>
              <rect x="4" y="17" width="16" height="2" rx="1" fill="currentColor"/>
            </svg>
          </button>
          {openIndexes[index] && (
            <div className="p-4 bg-gray-200 rounded-lg mt-2">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Faq;

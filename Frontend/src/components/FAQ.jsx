import { useState } from 'react';

function Faq() {
  const questionsAnswers = [
    { question: "What payment methods does your store accept and are there any specific requirements for each?", answer: "At our store, we offer various payment options to facilitate your purchases. We accept credit cards from major issuers, PayPal for those who prefer quick and secure online payments, and direct bank transfers. For bank transfers, please include your order reference number to expedite the confirmation process." },
    { question: "Could you please detail the guarantees or return policies your store offers for caps?",answer: "We stand behind the quality of our caps. We offer a six-month warranty to cover any defects in materials or workmanship. Additionally, if you're not satisfied with your purchase, we provide a 14-day return policy during which you can return the cap in its original condition for a full refund or exchange."},
    { question: "Are there any special benefits or discounts for frequent customers at your store?", answer: "We value our loyal customers and offer a loyalty program that includes a 15% discount on all orders after your third purchase. This benefit is automatically applied to your account and can be used on any future purchases of our caps."},
    { question: "Are there any special benefits or discounts for frequent customers at your company?", answer: "We greatly value our customer loyalty and, as a thank you, we offer a 10% discount on all orders for our repeat customers. This benefit is automatically activated in your account after your fifth purchase and is applicable to all future transactions " },
    { question: "How can I leave a review or feedback about your service after purchasing a cap?", answer: "Your feedback is crucial to us. You can leave your reviews or feedback on our website in the 'Reviews' section. Simply navigate to the product you purchased and you'll find an option to write a review. Sharing your experience helps us enhance our services and products."}
  ];

  const [openIndexes, setOpenIndexes] = useState(Array(questionsAnswers.length).fill(false));

  const toggleIndex = index => {
    const newOpenIndexes = [...openIndexes];
    newOpenIndexes[index] = !newOpenIndexes[index];
    setOpenIndexes(newOpenIndexes);
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl font-bold mb-5">Frequently Asked Questions</h2>
      {questionsAnswers.map((item, index) => (
        <div key={index} className="mb-2">
          <button
            className="py-2 px-4 w-full text-left flex justify-between items-center text-white bg-black font-semibold rounded-lg"
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
            <div className="flex items-center justify-center p-4 bg-gray-200 rounded-lg mt-2" data-aos="zoom-in">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Faq;
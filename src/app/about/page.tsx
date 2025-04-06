import '../../styles/home.css';

const About = () => {
  return (
    <div className="home">
      <div className="text-section w-1/2 p-8 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">About Our AI Chatbot</h1>
        <p className="gradient-text">
          Welcome to our AI-powered chatbot! We're excited to introduce you to a new way of interacting with technology, providing quick and efficient assistance, personalized recommendations, and answers to your queries.
          Built on cutting-edge artificial intelligence, our chatbot is designed to understand and respond to a wide range of user needs. Whether you’re looking for support, exploring new ideas, or just having a conversation, our bot is here to help you 24/7.
          We’ve focused on making the experience smooth, intuitive, and secure. Your privacy is our priority, and we work tirelessly to ensure that all your interactions are handled safely.
          Thank you for visiting. We’re continuously improving to bring you the best experience possible. If you have any feedback or need assistance, don't hesitate to reach out.
        </p>
      </div>
    </div>
  );
};

export default About;

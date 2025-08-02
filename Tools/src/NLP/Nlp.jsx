import "@NLP/Nlp.css";

const NLP = () => {
  return (
    <div className="nlp-container">
      <div className="nlp-header">
        <h1>🔤 NLP Analysis</h1>
        <p>Natural Language Processing tools and analysis</p>
      </div>

      <div className="nlp-box">
        <div className="nlp-card-header">
          <h2>Text Analysis & Processing</h2>
        </div>

        <div className="nlp-card-content">
          <div className="coming-soon">
            <div className="coming-soon-icon">🚧</div>
            <h3>Coming Soon!</h3>
            <p>
              We're working hard to bring you powerful NLP tools including
              sentiment analysis, text classification, named entity recognition,
              and more.
            </p>
            <div className="features-preview">
              <div className="feature-item">
                <span className="feature-icon">😊</span>
                <span>Sentiment Analysis</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📝</span>
                <span>Text Classification</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏷️</span>
                <span>Named Entity Recognition</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔍</span>
                <span>Text Summarization</span>
              </div>
            </div>
            <button className="notify-button">Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NLP;

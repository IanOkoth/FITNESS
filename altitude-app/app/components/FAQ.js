export default function FAQ() {
  return (
    <section className="sec faq" id="faq">
      <div className="wrap">
        <h2>Questions people ask first</h2>
        <div className="faqList">
          <details>
            <summary>What if we are in different time zones?</summary>
            <p>
              We schedule around you. Sessions run early morning and evening
              Nairobi time to suit Europe, the Middle East and the Americas.
            </p>
          </details>
          <details>
            <summary>Do I need a gym?</summary>
            <p>
              No. We build around what you have, from a full gym to a pair of
              dumbbells or just a floor.
            </p>
          </details>
          <details>
            <summary>How does payment work?</summary>
            <p>
              Pay by card, PayPal, bank transfer or M-Pesa. You can switch or
              pause your plan at any time.
            </p>
          </details>
          <details>
            <summary>Can I train in person in Kenya?</summary>
            <p>
              Yes. In-person sessions are available in Nairobi, and many clients
              mix online and in-person when they visit.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import './PaymentForm.css';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    month: '',
    year: '',
    cvv: ''
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      Kart Bilgileri:
      İsim: ${formData.cardName}
      Kart No: ${formData.cardNumber}
      Ay: ${formData.month}
      Yıl: ${formData.year}
      CVV: ${formData.cvv}
    `);
  };

  return (
    <div className="payment-form-container">
         <h1 className='payment-form-title'>Ödeme Bilgileri</h1>
     
      <p className="subtitle">Kredi kartı bilgilerinizi giriniz</p>
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="cardName">Kart Üzerindeki İsim</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="Ceyda Elik"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Kart Numarası</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
            maxLength="19"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="month">Ay</label>
            <select
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            >
              <option value="">AA</option>
              {months.map(month => (
                <option key={month} value={month}>
                  {month.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Yıl</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">YY</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cvv">Güvenlik Kodu</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Şimdi Öde
        </button>
      </form>
    </div>
  );
};

export default PaymentForm; 
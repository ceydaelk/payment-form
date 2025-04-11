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

  const [errors, setErrors] = useState({
    cardName: '',
    cardNumber: '',
    cvv: ''
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let error = '';

    switch (name) {
      case 'cardNumber':
        newValue = formatCardNumber(value);
        if (newValue.replace(/\s/g, '').length > 0 && !/^\d+$/.test(newValue.replace(/\s/g, ''))) {
          error = 'Sadece sayı giriniz';
        }
        break;

      case 'cvv':
        newValue = value.replace(/\D/g, '').substr(0, 3);
        if (newValue.length > 0 && !/^\d+$/.test(newValue)) {
          error = 'Sadece sayı giriniz';
        }
        break;

      case 'cardName':
        if (value.length > 0 && /\d/.test(value)) {
          error = 'Sayı içeremez';
        }
        break;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));

    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const newErrors = {};
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = '16 haneli kart numarası giriniz';
    }
    if (formData.cvv.length !== 3) {
      newErrors.cvv = '3 haneli güvenlik kodu giriniz';
    }
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Kart sahibinin adını giriniz';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
          {errors.cardName && <span className="error-message">{errors.cardName}</span>}
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
          {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
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
            {errors.cvv && <span className="error-message">{errors.cvv}</span>}
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
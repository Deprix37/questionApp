import React from 'react'
import PropTypes from 'prop-types';
import './css/info.css'

function Info({ startQuiz }) {
    const handleClick = () => {
        startQuiz();
    };
    return (
        <div>
            <div className='info'><ul>
                <li>Toplam 10 soru bulunmaktadır.</li>
                <li>Bir soru için maksimum 30 saniyen var</li>
                <li>İlk 10 saniye şıklar görünmemektedir.</li>
                <li> Cevap şıklarından biri tıklandıktan ya da 30sn tamamlandıktan sonra yeni soruya geçilecektir.</li>
                <li>Geçmiş sorulara dönülemeyecektir. Bol Şans!</li></ul></div>
            <div><button id="start" onClick={handleClick}>Başla</button></div>
        </div>
    );
}
Info.propTypes = {
    startQuiz: PropTypes.func.isRequired,
};

export default Info
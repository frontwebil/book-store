import { CartCard } from "../Outlet/Cart/CartCard";

export function OrderSection({ cart, setOrderUserInfo, orderUserInfo }) {
  return (
    <div className="order-section">
      <div className="order-section-block">
        <div className="order-section-block-row">
          <div className="order-section-form">
            <label>Ім'я</label>
            <input
              type="text"
              placeholder="Введіть своє ім'я"
              required
              value={orderUserInfo.name}
              onChange={(e) =>
                setOrderUserInfo({ ...orderUserInfo, name: e.target.value })
              }
            />
          </div>

          <div className="order-section-form">
            <label>Прізвище</label>
            <input
              type="text"
              placeholder="Введіть своє прізвище"
              required
              value={orderUserInfo.surname}
              onChange={(e) =>
                setOrderUserInfo({ ...orderUserInfo, surname: e.target.value })
              }
            />
          </div>
        </div>
        <div className="order-section-block-row">
          <div className="order-section-form">
            <label>Номер Телефону</label>
            <input
              type="tel"
              placeholder="Введіть свій номер телефону"
              required
              value={orderUserInfo.tel}
              onChange={(e) =>
                setOrderUserInfo({ ...orderUserInfo, tel: e.target.value })
              }
            />
          </div>

          <div className="order-section-form">
            <label>Пошта</label>
            <input
              type="email"
              placeholder="Введіть свою пошту"
              required
              value={orderUserInfo.mail}
              onChange={(e) =>
                setOrderUserInfo({ ...orderUserInfo, mail: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="order-section-block">
        <div className="warning-block">
          Після підтвердження замовлення ми повідомимо вас на електронну пошту.
        </div>
        <div className="warning-block">
          За потреби ми можемо зв’язатися з вами для уточнення деталей через
          телефоний дзвінок або месенджери (Viber, Telegram).
        </div>
        <div className="warning-block">
          Оплата тільки при отриманні (накладений платіж).
        </div>
      </div>

      <div className="order-section-block">
        <h3>Товари</h3>
        {cart.map((el) => (
          <CartCard book={el} key={el._id} />
        ))}
      </div>


      <div className="order-section-block">
        <div className="order-section-block-row">
          <div className="order-section-form">
            <label>Спосіб Доставки</label>
            <select
              value={orderUserInfo.delivery}
              onChange={(e) =>
                setOrderUserInfo({ ...orderUserInfo, delivery: e.target.value })
              }
            >
              <option value="Нова Пошта">Нова Пошта</option>
              <option value="Укр Пошта">Укр Пошта</option>
              <option value="Meets">Meets</option>
            </select>
          </div>
          <div className="order-section-form">
            <label>Адреса доставки</label>
            <input
              type="text"
              placeholder="Вкажіть адресу"
              required
              value={orderUserInfo.address}
              onChange={(e) =>
                setOrderUserInfo({ ...orderUserInfo, address: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="order-section-block">
        <div className="order-section-block-row">
          <div className="order-section-form">
            <label>Коментар</label>
            <input
              type="text"
              placeholder="Не обов'язково"
              value={orderUserInfo.comment}
              onChange={(e) =>
                setOrderUserInfo({ ...orderUserInfo, comment: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

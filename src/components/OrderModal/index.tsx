import { useContext } from "react";
import OrderTicket from "../../components/OrderTicket";
import { OrderContext } from "../../contexts/OrderContext";
import AditionalsModal from "../AditionalsModal";
import CardProductModal from "../CardProductModal";
import DescriptionAndCounter from "../DescriptionAndCounter";
import { aditionals } from "./adtionalObject";

export default function OrderModal() {
  const { modalOpen, setModalOpen, price, counter, setCounter, observation, setObservation } = useContext(OrderContext)
  const handleClick = () => {
    setModalOpen(!modalOpen)
    setCounter(1)
  }

  return (
    <div className={` ${modalOpen ? "fixed" : "hidden"} inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex py-10 justify-center overflow-y-auto z-50`}>
      <div className="bg-white p-5 rounded w-3/4 h-min relative">
        <span className="text-xl font-extrabold">Revise seu Pedido!</span>
        <button className="w-5 h-5 bg-contain absolute top-5 right-4 bg-icon-close"
          onClick={handleClick}
        />
        {/* section containing card and counter */}
        <section className="flex flex-wrap items-center justify-center md:justify-evenly">
          <CardProductModal />
          <DescriptionAndCounter />
          <span className="font-extrabold m-4 w-20">{`R$ ${(price * counter).toFixed(2)}`}</span>
        </section>
        {/* Section containing additional products */}
        <section className="my-10">
          <label className="text-md font-extrabold">Adicionais</label>
          <p className="text-xs">Selecione os ingredientes que você quer adicionar a mais no seu lanche</p>
          {aditionals.map((aditional, index) => (
            <AditionalsModal
              key={aditional.name + index}
              text={aditional.name}
              img={aditional.img}
            />
          ))}
        </section>
        {/* Section containing customer note */}
        <section>
          <label className="text-md font-extrabold"
            htmlFor="observation"
          >
            Observaçãoes
          </label>
          <textarea className="bg-gray-100 resize-none p-3 my-3 w-full rounded-lg"
            name="observation"
            id="observation"
            cols={30}
            rows={5}
            placeholder="Adicione uma observação ao seu pedido"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
        </section>
        <OrderTicket />
        <div className="my-5 flex flex-wrap justify-evenly">
          <input className="w-48 h-7 my-2 border border-solid border-primary text-primary rounded-lg cursor-pointer hover:scale-105 transition-transform"
            type="button"
            value="Continuar Adicionando"
            onClick={handleClick}
          />
          <input className="w-48 h-7 my-2 bg-primary text-white rounded-lg cursor-pointer hover:scale-105 transition-transform"
            type="Submit"
            value="Adicionar ao pedido"
          />
        </div>
      </div>
    </div >
  )
}

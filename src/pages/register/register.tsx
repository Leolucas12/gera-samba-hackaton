import './register.css';

export default function Register() {

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                       <div className="content-register">
                        <header>
                            <h1>Gera Samba</h1>
                        </header>
                        <h2>Cadastro do BOT</h2>
                        <form action="">
                            <div className="form-group">
                                <div  className="form-group-item">
                                    <label htmlFor="">Nome da sua empresa</label>
                                    <input type="text" name="" id="" placeholder='Digite o nome da empresa' />
                                </div>
                                
                                <div className="form-group-item">
                                    <label htmlFor="">Qual o nicho da sua Empresa</label>
                                    <select name="" id="">
                                        <option value="" disabled selected>Selecione a área de atuação</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-item">
                                    <label htmlFor="">Titulo do Bot</label>
                                    <input type="text" name="" id="" placeholder="Digite o titulo do bot" />
                                </div>
                                <div className="form-group-item">
                                    <label htmlFor="">Tipo do Contexto</label>
                                    <select name="" id="">
                                        <option value="" disabled selected>Selecione o tipo do bot</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-item">
                                    <label htmlFor="">Descreva o contexto da conversa</label>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div className="display-button">
                                <button>Cadastrar Bot</button>
                            </div>
                        </form>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
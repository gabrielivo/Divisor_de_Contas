class Produtos{

    constructor(){
        this.id = 1;
        this.arrayp = [];
        this.editId = null;
    }
   
    salvar(){
        let produtos = this.lerdados();
        if(this.validar(produtos) == true){
           if(this.editId == null){
                this.adicionar(produtos);
                console.log(this.arrayp)
           } else {
                this.atualizar(this.editId, produtos);
            }
        }
        this.lista()
        this.cancelar();

    }

    lista(){
        let tbody = document.querySelector('#tbody');
        tbody.innerHTML = ''

        for(let a = 0; a < this.arrayp.length; a++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_consumidores = tr.insertCell();
            let td_valorapagar = tr.insertCell();
            let td_opcoes = tr.insertCell();
            

            td_id.innerText = this.arrayp[a].id;
            
            td_produto.innerText = this.arrayp[a].nome;

            td_valor.innerText = this.arrayp[a].valor;

            td_consumidores.innerText = this.arrayp[a].consumidores

            td_valorapagar.innerText = this.arrayp[a].valorapagar


            let imgDel = document.createElement('img')
            imgDel.src = 'img/excluir.png'
            imgDel.setAttribute("onclick", "produtos.deletar("+ this.arrayp[a].id +")")

            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/editar-texto.png'
            
            imgEdit.setAttribute("onclick", "produtos.prep_edit("+ JSON.stringify(this.arrayp[a]) +")")

            td_opcoes.appendChild(imgDel)
            td_opcoes.appendChild(imgEdit)
        }

 
    }



    adicionar(produtos){
        produtos.valor = parseFloat(produtos.valor)
        produtos.valorapagar = parseFloat(produtos.valorapagar)
        this.arrayp.push(produtos);
        this.id++;
    }

    lerdados(){
        let produtos = {}

        produtos.id = this.id;
        produtos.nome = document.querySelector('#nprod').value;
        produtos.valor = document.querySelector('#vprod').value;
        produtos.ncliente = document.querySelector('#nomecliente').value
        produtos.consumidores = document.querySelector('#divisor').value
        produtos.valorapagar = produtos.valor / produtos.consumidores

        return produtos
    }

    validar(produtos){
        let msg = ''
        if(produtos.nome.length == 0 || produtos.valor.length == 0 || produtos.ncliente.length == 0 ){
            msg =  'Insira todos os dados!'
        } 

        if(produtos.consumidores <= 0){
            msg += ' O número mínimo de consumidores é 1!'
        }

        if(produtos.id > 1){
            var nomecliente = this.arrayp[0].ncliente
            if(produtos.ncliente != nomecliente){
                msg = 'Para adicionar outra pessoa, finalize a sessão atual e clique em "resetar"!'
            }
        }

        if(msg != ''){
            alert(msg);
            return false
        } else {
            return true
        }
    }

    cancelar(){
        document.querySelector('#divisor').value = ''
        document.querySelector('#nprod').value = '' 
        document.querySelector('#vprod').value = ''
        document.querySelector('#b1').innerText = 'Salvar'
        this.editId = null

        var resp = document.querySelector('#resp')
        var resp1 = document.querySelector('#resp1')
        var resp2 = document.querySelector('#resp2')
        resp.innerHTML = ''
        resp1.innerHTML = ''
        resp2.innerHTML = ''
    }

    deletar(id){
        if(confirm('Deseja excluir o produto?') == true){
            let tbody = document.querySelector('#tbody')

        for(let a = 0; a < this.arrayp.length; a++ ){
            if(this.arrayp[a].id == id){
                this.arrayp.splice(a, 1)
                tbody.deleteRow(a)
            }
        }
        }
    }

    prep_edit(dados){
        this.editId = dados.id
        document.querySelector("#nprod").value = dados.nome
        document.querySelector("#vprod").value = dados.valor
        document.querySelector('#b1').innerText = 'Atualizar'
        document.querySelector('#divisor').value = dados.consumidores
    }

    atualizar(id, produtos){
        for(let a = 0; a < this.arrayp.length; a++ ){
            if(this.arrayp[a].id == id){
                this.arrayp[a].nome = produtos.nome;
                this.arrayp[a].valor = produtos.valor;
                this.arrayp[a].consumidores = produtos.consumidores;
                this.arrayp[a].valorapagar = produtos.valorapagar;
            }
        }
    }

    finalizar(produtos){
        if(confirm('Você realmente deseja finalizar?') == true){
            alert('Seu problema está resolvido! Você pode continuar adicionando itens se quiser (não se preocupe, os resultados antigos são apagados automaticamente!) Se quiser calcular valores para outra pessoa, clique em resetar!')
        var resp = document.querySelector('#resp')
        var resp1 = document.querySelector('#resp1')
        var resp2 = document.querySelector('#resp2')
        var soma = 0
        var vfinal = 0
        var nomecliente = this.arrayp[0].ncliente
        
        for(var i =0; i < this.arrayp.length; i++){
            soma += this.arrayp[i].valorapagar
            vfinal += this.arrayp[i].valor
        }

        
        }
        

        resp.innerHTML = 'Resultado: O valor total da conta é: '
        resp.innerHTML += vfinal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        resp1.innerHTML +=' O valor a ser pago por ';
        resp1.innerHTML +=nomecliente;
        resp1.innerHTML +=' é ';
        resp1.innerHTML += soma.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        resp2.innerHTML = 'Caso haja o acréscimo de 10%, o valor a ser pago é:';
        resp2.innerHTML += (soma * 1.1).toLocaleString('pt-BR', {style: 'currency', currency : 'BRL'})


        
    }

    resetar(){
        if(confirm('Tem certeza que deseja resetar?') == true){
            document.location.reload()
        }
    }

    instructions(){
    }

} 

var produtos = new Produtos ();

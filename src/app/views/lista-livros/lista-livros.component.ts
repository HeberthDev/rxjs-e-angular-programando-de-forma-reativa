import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  public listaLivros: [];
  public campoBusca = '';

  constructor(
    private livroService: LivroService,
  ) { }

  buscarLivros() {
    this.livroService.buscar(this.campoBusca).subscribe(
      (retornoAPI) => console.log(retornoAPI),
      (error) => console.log(error),
    );
  }
}

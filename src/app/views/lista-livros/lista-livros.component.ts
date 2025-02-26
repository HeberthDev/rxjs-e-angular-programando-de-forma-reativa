import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {
  public listaLivros: [];
  public campoBusca = '';

  private subscription: Subscription;

  constructor(
    private livroService: LivroService,
  ) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: retornoAPI => console.log(),
      error: erro => console.log(erro),
      complete: () => console.log('Observable completado!'),
    });
  }
}

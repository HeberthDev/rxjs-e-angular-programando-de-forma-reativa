import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Subscription, switchMap } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {
  public listaLivros: Livro[];
  public campoBusca = new FormControl();

  private subscription: Subscription;
  private livro: Livro;

  constructor(
    private livroService: LivroService,
  ) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      map((items) => this.listaLivros = this.livrosResultadoParaLivros(items))
    )

  // public buscarLivros() {
  //   this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       console.log('Requisições');
  //       this.listaLivros = this.livrosResultadoParaLivros(items);
  //     },
  //     error: erro => console.log(erro),
  //   });
  // }

  public livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}

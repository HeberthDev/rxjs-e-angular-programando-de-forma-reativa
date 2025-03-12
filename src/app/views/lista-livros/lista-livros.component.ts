import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  public campoBusca = new FormControl();
  public mensagemErro = '';
  public livrosResultado: LivrosResultado;

  private pausa = 300;

  constructor(
    private livroService: LivroService,
  ) { }

  totalDeLivros$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(this.pausa),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo Inicial')),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map(resultado => this.livrosResultado = resultado),
    catchError(erro => {
      console.log(erro);
      return of();
    })
  );

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(this.pausa),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo Inicial')),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      tap((retornoAPI) => console.log(retornoAPI)),
      map(resultado => resultado.items ?? []),
      map((items) => this.livrosResultadoParaLivros(items)),
      catchError(erro => {
        // this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação.';
        console.log(erro);
        return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação.'));
      })
    );

  public livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}

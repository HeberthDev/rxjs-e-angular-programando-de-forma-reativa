import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  public campoBusca = new FormControl();

  private pausa = 300;

  constructor(
    private livroService: LivroService,
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(this.pausa),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo Inicial')),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      tap((retornoAPI) => console.log(retornoAPI)),
      map((items) => this.livrosResultadoParaLivros(items)),
      catchError(erro => {
        console.log(erro)
        return throwError(() => new Error('Ops, ocorreu um erro'));
      })
    )

  public livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}

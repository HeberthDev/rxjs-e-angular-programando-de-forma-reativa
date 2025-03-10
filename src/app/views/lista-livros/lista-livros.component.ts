import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
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

  constructor(
    private livroService: LivroService,
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      tap(() => console.log('Fluxo Inicial')),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      tap(() => console.log('Requisição')),
      map((items) => this.livrosResultadoParaLivros(items))
    )

  public livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}

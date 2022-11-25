import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-cadastrar-jogo",
  templateUrl: "./cadastrar-jogo.component.html",
  styleUrls: ["./cadastrar-jogo.component.css"],
})
export class CadastrarJogoComponent implements OnInit {

  selecoes!: Selecao[];
  selecaoAId!: number;
  selecaoBId!: number;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar").subscribe({
      next: (selecoes) => {
        this.selecoes = selecoes;
      },
    });
  }

  cadastrar(): void {
    let jogo: Jogo = {
      selecaoA: this.selecoes.find(sel => sel.id == this.selecaoAId), 
      selecaoB: this.selecoes.find(sel => sel.id == this.selecaoBId),
    }

    this.http.post<Jogo>("https://localhost:5001/api/jogo/cadastrar", jogo).subscribe({
      next: (jogo) => {
        this._snackBar.open("Jogo cadastrado!", "Ok!", {
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/jogo/listar"]);
      },
      error: (error) => {
        console.error("Algum erro aconteceu!");
      }
    });
  }
}

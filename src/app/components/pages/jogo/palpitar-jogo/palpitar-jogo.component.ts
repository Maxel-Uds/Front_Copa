import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {

  selecaoA?: string;
  selecaoB?: string;
  placarA?: number;
  placarB?: number;
  id!: number;
  jogo!: Jogo;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        let { id } = params;
        if (id !== undefined) {
          this.http.get<Jogo>(`https://localhost:5001/api/jogo/buscar/${id}`).subscribe({
            next: (jogo) => {
              this.jogo = jogo;
              this.id = id;
              this.selecaoA = jogo.selecaoA?.nome;
              this.selecaoB = jogo.selecaoB?.nome;
              this.placarA = jogo.selecaoAGol;
              this.placarB = jogo.selecaoBGol;
            }
          });
        }
      },
    });
  }

  palpitar(): void {
    this.jogo.selecaoAGol = this.placarA
    this.jogo.selecaoBGol = this.placarB

    this.http.patch<Jogo>("https://localhost:5001/api/jogo/alterar", this.jogo)
    .subscribe({
      next: (jogo) => {
        this._snackBar.open("Palpite cadastrado!", "Ok!", {
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

import { Selecao } from "./selecao.model";

export interface Jogo {
  id?: number;
  selecaoA?: Selecao;
  selecaoAGol?: number;
  selecaoB?: Selecao;
  selecaoBGol?: number;
  criadoEm?: string;
}

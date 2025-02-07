import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { CandidateFinder } from "../../../contexts/backoffice/candidate/application/find/CandidateFinder";
import { BackofficeCandidate } from "../../../contexts/backoffice/candidate/domain/BackofficeCandidate";
import { Controller } from "../../_core/controllers/Controller";

@injectable()
export class CandidateGetController extends Controller {
  constructor(@inject(CandidateFinder) private readonly finder: CandidateFinder) {
    super();
  }

  protected async run(req: Request, _res: Response) {
    const uid = req.params.uid;
    const candidate = await this.finder.find({ id: uid });
    return candidate ? this.toResponse(candidate) : null;
  }

  private toResponse(candidate: BackofficeCandidate) {
    return {
      id: candidate.id.toString(),
      score: candidate.score,
    };
  }
}



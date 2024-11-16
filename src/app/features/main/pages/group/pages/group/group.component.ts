import { AfterViewInit, Component, effect, ElementRef, QueryList, signal, ViewChildren } from '@angular/core';
import { BillResponse, CreateBillRequest, GroupResponse, ProductResponse } from '../../../../../../../generated';
import { GroupsApiService } from '../../../../services/groups-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsFilterPipe } from '../../../../pipes/groups-filter.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    GroupsFilterPipe,
    FormsModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export default class GroupComponent {
  groupId!: string;
  group = signal<GroupResponse | null>(null);

  activePage: "payment" | "bills" | "join" | "create" = 'payment';

  bills: BillResponse[] = [];
  amountToPay: number = 0;
  allDebt: number = 0;

  error: string | null = null;

  newBill: CreateBillRequest = { type: '', group_id: '', title: '', products: [] };

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsApiService
  ) {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.updateGroup();
    });

    effect(() => {
      if (this.group() === null) return;
      if (this.group()?.type === 'equal') return;
      this.newBill.group_id = this.group()?.id;

      this.groupService.getBillsFromGroup(this.groupId)
        .then(resp => this.bills = resp)
        .catch(error => console.log(error));

      this.groupService.getGroupDolg(this.groupId)
        .then(resp => this.allDebt += resp)
        .catch(e => console.log(e));
    });
  }

  inputAmountToPatHandler(event: any) {
    const input: HTMLInputElement = event.target;
    this.amountToPay = Math.min(this.allDebt, Number(input.value));
    input.value = String(this.amountToPay);
  }

  getPayUrl() {
    // TODO getting pay url
    if (this.group()?.type === 'group') {
      this.groupService.createGroupPayment(this.groupId, this.amountToPay)
        .then(resp => this.router.navigate([resp]))
        .catch(e => console.log(e));
    } else {
      const req: {amount: number, bills: {bill_id: string}[]} = { amount: this.amountToPay, bills: [] };
      this.bills.forEach(e => req.bills.push({bill_id: e.id}));
      this.groupService.createBillPayment(req)
        .then(resp => this.router.navigate([resp]))
        .catch(e => console.log(e));
    }
  }

  updateGroup() {
    this.groupService.getGroupById(this.groupId)
      .then(resp => this.group.set(resp))
      .catch(error => {
        console.log(error);
        this.router.navigate(['/home/groups'])
      });
  }

  onFileSelected(event: Event): void {
    this.error = null;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
      this.newBill.products = [];
      this.groupService.getProductsFromQR(formData)
        .then(resp => this.newBill.products = resp)
        .catch(error => {
          this.newBill.products = [];
        });
    }
  }

  remove(product: any) {
    this.newBill.products = this.newBill.products.filter((e: any) => e !== product);
  }

  createNewBill() {
    console.log(this.newBill);
    this.groupService.createBillForGroup(this.newBill)
      .then(resp => {
        this.updateGroup();
        this.activePage = 'bills';
      })
      .catch(error => { this.error = error;})
  }

  oneProductBillInputSum(event: any) {
    this.newBill.products = [{ price: event.target.value, name: this.newBill.title, quantity: 1 }];
  }
}

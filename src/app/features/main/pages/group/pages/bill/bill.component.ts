import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsApiService } from '../../../../services/groups-api.service';
import { BillResponse, ProductResponse, SetProducts, UserResponse } from '../../../../../../../generated';
import { ProfileApiService } from '../../../../../profile/services/profile-api.service';
import { GroupsFilterPipe } from '../../../../pipes/groups-filter.pipe';
import { effectVirtualTransitionEnd } from 'swiper/effect-utils';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    GroupsFilterPipe
  ],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export default class BillComponent {
  billId!: number;
  groupId!: number;
  bill = signal<BillResponse | null>(null);
  billMembers: UserResponse[] = [];

  products: ProductResponse[] = [];
  productsTaken: { productId: string, quantity: number }[] = [];

  profile;
  isProfileInBill: boolean = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsApiService,
    private profileService: ProfileApiService,
  ) {
    this.profile = this.profileService.currentUser;

    this.route.params.subscribe(params => {
      this.billId = params['billId'];
      this.groupId = params['groupId'];
      console.log(this.groupId);
      this.updateBill();
    });

    effect(() => {
      this.groupService.getProductsByBill(this.billId)
        .then(resp => this.products = resp)
        .catch(error => {
          console.log(error);
          this.router.navigate(['/home/groups'])
        })
      this.groupService.getMembersFromBill(this.billId)
        .then(resp => {
          let found = false;
          resp.forEach(user => found = user.username === this.profile()!.username)
          if (!found)
            this.groupService.joinBillById({ bill_id: this.billId, money: 0 });
        })
    });
  }

  updateBill() {
    this.groupService.getBillById(this.billId)
      .then(resp => this.bill.set(resp))
      .catch(error => {
        this.bill.set(null);
        this.router.navigate(['/home']).then();
      });
  }

  handleProductQuantityInput(product: ProductResponse, event: any) {
    console.log(event.target.value, product.quantity);
    event.target.value = String(Math.min(Number(event.target.value), product.quantity));

    let found: boolean = false;
    for (const e of this.productsTaken)
      if (e.productId === product.id) {
        found = true;
        e.quantity = Number(event.target.value);
      }
    if (!found)
      this.productsTaken.push({ productId: product.id, quantity: Number(event.target.value) });
  }

  postProducts() {
    // TODO post products
    const setProducts: SetProducts = { products: [] }
    this.productsTaken.forEach(a => setProducts.products.push({ product_id: a.productId, quantity: a.quantity }));
    console.log(setProducts);
    this.groupService.setProductsToBill(setProducts)
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }
}

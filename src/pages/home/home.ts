import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import {PhotoProvider} from '../../providers/photo/photo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('cropper') ImageCropper: ImageCropperComponent;
  public cropperSettings;
  public croppedWidth: Number;
  public croppedHeight: Number;
  public data: any;
  public canSave: boolean = false;

  constructor(public navCtrl: NavController, private _PHOTO: PhotoProvider) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.cropOnResize = true;
    this.cropperSettings.fileType = 'image/jpeg';
    this.cropperSettings.keepAspect = false;
    this.data = {};
  }

  handleCropping(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
    this.canSave = true;
  }

  selectImage() {
    this.canSave = false;
    this._PHOTO.selectImage()
      .then((data: any) => {
        let image: any = new Image();
        image.src = data;
        this.ImageCropper.setImage(image);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  saveImage() {
    console.dir(this.data.image);
  }


}

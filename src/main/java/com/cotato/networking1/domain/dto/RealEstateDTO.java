package com.cotato.networking1.domain.dto;

import com.cotato.networking1.domain.entity.RealEstate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RealEstateDTO {
    private Long id;
    private String zipCode;
    private String roadNameAddress;
    private String locationAddress;

    public RealEstateDTO(final RealEstate realEstate){
        this.id = realEstate.getId();
        this.zipCode = realEstate.getZipCode();
        this.roadNameAddress = realEstate.getRoadNameAddress();
        this.locationAddress = realEstate.getLocationAddress();

    }
}
